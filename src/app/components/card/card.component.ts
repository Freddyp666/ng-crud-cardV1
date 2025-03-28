import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CardModel } from '../../model/card-model';
import { CardService } from '../../service/card.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass',
})
export class CardComponent implements OnInit {
  listCards: CardModel[] = [];
  formCard: FormGroup = new FormGroup({});
  isUpdate: boolean = false;
  Item: any;
  selectedItem: any;
  @ViewChild('deleteModal') deleteModal!: ElementRef;

  constructor(
    private cardService: CardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.list();
    this.formCard = new FormGroup({
      idCard: new FormControl(''),
      name: new FormControl(''),
      number: new FormControl(''),
      type: new FormControl(''),
      cvv: new FormControl(''),
      status: new FormControl('1'),
    });
  }

  list() {
    this.cardService.getCards().subscribe((resp) => {
      if (resp) {
        this.listCards = resp;
      }
    });
  }

  save() {
    this.formCard.controls['status'].setValue('1');
    this.cardService.saveCard(this.formCard.value).subscribe((resp) => {
      if (resp) {
        this.list();
        this.formCard.reset();
      }
    });
  }

  update() {
    this.cardService.updateCard(this.formCard.value).subscribe((resp) => {
      if (resp) {
        this.list();
        this.formCard.reset();
      }
    });
  }

  newCard() {
    this.isUpdate = false;
    this.formCard.reset();
  }

  selectItem(item: any) {
    this.isUpdate = true;
    this.formCard.controls['idCard'].setValue(item.idCard);
    this.formCard.controls['name'].setValue(item.name);
    this.formCard.controls['number'].setValue(item.number);
    this.formCard.controls['type'].setValue(item.type);
    this.formCard.controls['cvv'].setValue(item.cvv);
  }

  delete(item: any) {
    console.log('la opcion deborrar' + item);
    this.cardService.deleteCard(item).subscribe((resp) => {
      if (resp) {
        this.list();
        this.closeDeleteModal();
      }
    });
  }

  openDeleteModal(item: any) {
    this.selectedItem = item;
    // Abre el modal de eliminación manualmente usando JavaScript
    if (this.deleteModal && this.deleteModal.nativeElement) {
      const modal = this.deleteModal.nativeElement;
      modal.querySelector('.btn-open').click();
    }
  }

  closeDeleteModal() {
    // Cierra el modal de eliminación manualmente usando JavaScript
    if (this.deleteModal && this.deleteModal.nativeElement) {
      const modal = this.deleteModal.nativeElement;
      modal.querySelector('.btn-close').click();
    }
  }

  closeSesion() {
    this.authService.logout();
  }
}
