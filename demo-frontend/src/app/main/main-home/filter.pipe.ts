import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    if(value){
      for (const publications of value) {
        if(publications.categoryName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultPosts.push(publications);
        }
        if(publications.provinceName.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultPosts.push(publications);
        }
        if(publications.userLogin.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultPosts.push(publications);
        }
      }
    }
    return resultPosts;
  }

}
