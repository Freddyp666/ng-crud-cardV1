import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CardModel } from '../../model/card-model';
import { CardService } from '../../service/card.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent implements OnInit {
  listCards: CardModel [] = [];
  formCard: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  Item: any;
  
  constructor(private cardService: CardService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.list();
    this.formCard =  new FormGroup({
      idCard: new FormControl(''),
      name: new FormControl(''),
      number: new FormControl(''),
      type: new FormControl(''),
      cvv: new FormControl(''),
      status: new FormControl('1')
    });
  }

  list(){
    this.cardService.getCards().subscribe(resp=>{
      if(resp){
        this.listCards = resp;
      }
    });
  }

  save(){
    this.formCard.controls['status'].setValue('1');
    this.cardService.saveCard(this.formCard.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formCard.reset();
      }
    });
  }

  update(){
    this.cardService.updateCard(this.formCard.value).subscribe(resp=>{
      if(resp){
        this.list();
        this.formCard.reset();
      }
    });
  }

  delete(id: any){
    this.cardService.deleteCard(id).subscribe(resp=>{
      if(resp){
        this.list();
      }
    });
  }

  newCard(){
    this.isUpdate = false;
    this.formCard.reset();
  }

  selectItem(item: any){
    this.isUpdate = true;
    this.cdRef.detectChanges();
    this.formCard.controls['idCard'].setValue(item.idCard);
    this.formCard.controls['name'].setValue(item.name);
    this.formCard.controls['number'].setValue(item.number);
    this.formCard.controls['type'].setValue(item.type);
    this.formCard.controls['cvv'].setValue(item.cvv);
    console.log('Item seleccionado:', item);
    console.log('FormCard después de selectItem:', this.formCard.value);
  }
  
  deleteItem(item: any){
    this.Item = item;
  }

}
