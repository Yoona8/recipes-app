import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    ShortenPipe
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    DropdownDirective,
    ShortenPipe
  ]
})
export class SharedModule {}
