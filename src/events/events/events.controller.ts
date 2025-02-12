import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/v1/events')
export class EventsController
{
    @Post('two-way-actions')
    createTwoWayAction(@Body() dto: any)
    {
        return dto;
    }
}
