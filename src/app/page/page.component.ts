import { Component, OnInit } from '@angular/core';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { CardsDto } from '../model/CardsDto';
import { Service } from '../service/service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers: [MessageService]
})
export class PageComponent implements OnInit {

  cards!: CardsDto[];
  transactions!: any[];
  transactionsOne!: any[];
  models: boolean = false;
  title!: string;
  msgs3: Message[] = [];

  constructor(private service: Service, private primengConfig: PrimeNGConfig, private serviceMessage: MessageService) { }

  ngOnInit(): void {
    this.loadAllCards();
    this.loadAllTransactions();

    this.primengConfig.ripple = true;
  }

  loadAllCards() {
    this.service.getAllCards().subscribe((data: any) => {
      this.cards = data;
      console.log(this.cards);
    });
  }

  loadAllTransactions(){
    this.service.getAllTransactions().subscribe((data: any) => {
      this.transactions= data;
      console.log(this.transactions);
    });
  }

  model(searchQuery: any){
    this.models= true;
    this.service.getTransactions(searchQuery.numberCard, searchQuery.id).subscribe((data: any) => {
      this.transactionsOne = data;
    });
    if (this.transactionsOne == undefined || this.transactionsOne.length <=0) {
      console.log("1 message");
      this.messageDialog('warn', 'N0 se encontro trasacciones', 'Trasacciones')
    }
  }

  messageDialog(level:string, stage:string, summary:string) {
    this.serviceMessage.add({ key: 'tst', severity: level, summary: summary, detail: stage, icon: 'pi pi-check' });
  }
}
