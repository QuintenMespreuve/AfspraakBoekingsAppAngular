import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  faqs = [
    { question: 'Wat doet Avelius Advocatenkantoor?', answer: 'Avelius biedt juridisch advies en vertegenwoordiging in verschillende rechtsgebieden, waaronder familierecht, ondernemingsrecht, en strafrecht.' },
    { question: 'Hoe kan ik een afspraak maken?', answer: 'U kunt een afspraak maken door ons telefonisch te bereiken of door ons online contactformulier in te vullen.' },
    { question: 'Wat zijn de kosten van een consult?', answer: 'De kosten voor een eerste consult zijn afhankelijk van het type zaak. Neem contact met ons op voor specifieke tarieven.' },
    { question: 'Werkt Avelius op basis van no cure, no pay?', answer: 'In bepaalde gevallen kunnen we werken op basis van no cure, no pay. Dit wordt besproken tijdens het eerste consult.' }
  ];

  constructor() { }

  ngOnInit() {
  }

}
