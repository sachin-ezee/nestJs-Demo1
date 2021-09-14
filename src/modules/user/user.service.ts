import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection, getManager } from 'typeorm';
import { UserTeams } from './user_team.entity';
import { User, UserFillableFields } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserTeams)
    private readonly userTeamRepository: Repository<UserTeams>,
  ) {}

  async get(id: number) {
    return this.userRepository.findOne({ id });
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  async create(payload: UserFillableFields) {
    const user = await this.getByEmail(payload.email);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await this.userRepository.save(payload);
  }
  async team(){
     const user = await getManager().createQueryBuilder()
     .select("ut.team_id", "team_id")
     .addSelect("ut.team_name", "team_name")
     .addSelect("ut.user_id1", "user_id1")
     .addSelect("COALESCE(CONCAT(u.firstName,' ', u.lastName), '')", "full_name1")
     .addSelect("ut.user_id2", "user_id2")
     .addSelect("COALESCE(CONCAT(u1.firstName,' ', u1.lastName), '')", "full_name2")
     .from(UserTeams, "ut")
     .leftJoin(User, "u", "u.id = ut.user_id1")
     .leftJoin(User, "u1", "u1.id = ut.user_id2")

    // SELECT ut.team_id, ut.user_id1, ut.user_id2, ut.team_name, COALESCE(CONCAT(u.firstName,' ', u.lastName), '') as full_name1, COALESCE(CONCAT(u1.firstName,' ', u1.lastName), '') as full_name2 FROM user_team ut LEFT JOIN users u ON u.id = ut.user_id1 LEFT JOIN users u1 ON u1.id = ut.user_id2

    const dailyStatsRaws = await user.getRawMany();
 
    const dailyStats = dailyStatsRaws.map((s: any) => {
        const item = {
            teamId: s.team_id,
            teamName: s.team_name,
            userId1: s.user_id1,
            fullName1: s.full_name1,
            userId2: s.user_id2,
            fullName2: s.full_name2,
        };
        return item;
    }); 
    return dailyStats
  }
}


