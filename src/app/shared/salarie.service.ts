import { Injectable } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';



@Injectable({
  providedIn: 'root'
})
export class SalarieService {

  constructor(private firebase: AngularFireDatabase) { }

  salarieList: AngularFireList<any>;

  initializedFormGroup() {
    this.form.setValue({
      $key: null ,
      prenom:'',
      fonction:'',
      annees_XP:'',
      adresse: '',
      salaire:'',
      date_de_naissance:''

    })
  }

  
  form:FormGroup = new FormGroup({
   $key: new FormControl(null) ,
   prenom:new FormControl(''),
   fonction:new FormControl(''),
   annees_XP:new FormControl(''),
   adresse: new FormControl(''),
   salaire:new FormControl(''),
   date_de_naissance:new FormControl('')

  });

  getSalaries(){
    this.salarieList=this.firebase.list('salaries');
    return this.salarieList.snapshotChanges();
  }
  insertSalarie(salarie:any){
    this.salarieList.push({
      prenom:salarie.prenom,
      fonction:salarie.fonction,
      annees_XP:salarie.annees_XP,
      adresse:salarie.adresse,
      salaire:salarie.salaire,
      date_de_naissance:salarie.date_de_naissance
    });
  }

  updateSalarie(salarie:any){
    this.salarieList.update(salarie.$key,
      {
        prenom:salarie.prenom,
      fonction:salarie.fonction,
      annees_XP:salarie.annees_XP,
      adresse:salarie.adresse,
      salaire:salarie.salaire,
      date_de_naissance:salarie.date_de_naissance

      });
  }
  
  deleteSalarie($key:string){
    this.salarieList.remove($key);

  }
  populateForm(salarie){
    this.form.patchValue(salarie);
  };



}
