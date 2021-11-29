import { ClassSerializerInterceptor, Controller, Get, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { RedisService } from '../shared/redis.service';
import { UserService } from './user.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly redisService: RedisService
    ){}

    @Get('admin/ambassadors')
    async ambassadors(){
        return this.userService.find({
            is_ambassador: true
        })
    }

    @Get('ambassador/rankings')
    async rankings(
        @Res() response: Response
    ) {
        const client = this.redisService.getClient();

        client.zrevrangebyscore('rankings', '+inf', '-inf', 'withscores', (err, result) => {
            let score;

            response.send(result.reduce((o, r) => {
                if (isNaN(parseInt(r))) {
                    return {
                        ...o,
                        [r]: score
                    }
                } else {
                    score = parseInt(r);
                    return o;
                }
            }, {}));
        });
    }
}
