import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseArrayPipe implements PipeTransform {
    transform(value: string) {
        return value.split(',');
    }
}
