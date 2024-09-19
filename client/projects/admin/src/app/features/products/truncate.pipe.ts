import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100, ellipsis: string = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }
}
