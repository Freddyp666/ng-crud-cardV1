import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModel } from '../../model/card-model';
import { CardService } from '../../service/card.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})
export class CardComponent{
  listCards: CardModel [] = [];
  formCard: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  
  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.list();
    this.formCard =  new FormGroup({
      id_card: new FormControl(''),
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
    this.formCard.controls['id_card'].setValue(item.id_card);
    this.formCard.controls['name'].setValue(item.name);
    this.formCard.controls['number'].setValue(item.number);
    this.formCard.controls['type'].setValue(item.type);
    this.formCard.controls['cvv'].setValue(item.cvv);
  }
  
}
