import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import the 'map' operator

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  appointment = {
    name: '',
    email: '',
    date: '',
    notes: ''
  };

  today: string = '';

  unavailableDates$: Observable<string[]> | undefined;

  constructor(private db: AngularFireDatabase, private toastCtrl: ToastController) {
    // Stel de huidige datum in bij de initiële constructie van de component
    this.setTodayDate();
  }

  ngOnInit() {
    this.loadUnavailableDates();
  }

  setTodayDate() {
    // Haal de huidige datum op en zet deze in de today variabele in het formaat YYYY-MM-DD
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
    this.appointment.date = this.today; // Stelt de appointment date ook in op vandaag
  }

  loadUnavailableDates() {
    this.unavailableDates$ = this.db.list('appointments').snapshotChanges().pipe(
      map((changes: any[]) => 
        changes.map(c => c.key as string)
      )
    );
    
    this.unavailableDates$.subscribe(dates => {
      console.log('Niet beschikbare datums:', dates);
    });
  }

  async bookAppointment() {
    const dateFormatted = this.appointment.date.split('T')[0];
    const appointmentRef = this.db.list(`appointments/${dateFormatted}`);
    
    appointmentRef.query.once('value', snapshot => {
      if (snapshot.exists()) {
        this.presentToast('Er is al een afspraak geboekt op deze datum. Kies een andere datum.');
      } else {
        appointmentRef.push(this.appointment).then(() => {
          this.presentToast('Afspraak succesvol geboekt!');
          this.clearForm();
          this.loadUnavailableDates();
        });
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  clearForm() {
    this.appointment = {
      name: '',
      email: '',
      date: this.today, // Reset naar de huidige datum
      notes: ''
    };
  }
}
