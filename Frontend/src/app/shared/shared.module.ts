import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PrimeNgModule } from './prime-ng/prime-ng.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [PrimeNgModule, FormsModule],
})
export class SharedModule {}
