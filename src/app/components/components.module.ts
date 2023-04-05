import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { ComponentsRoutingModule } from './components-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, ComponentsRoutingModule],
})
export class ComponentsModule {}
