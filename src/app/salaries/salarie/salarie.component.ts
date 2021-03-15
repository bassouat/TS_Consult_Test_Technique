import { Component, OnInit } from '@angular/core';
import{SalarieService} from '../../shared/salarie.service';
import{NotificationService} from '../../shared/notification.service';
import{MatDialogRef} from  '@angular/material/dialog';


@Component({
  selector: 'app-salarie',
  templateUrl: './salarie.component.html',
  styleUrls: ['./salarie.component.css']
})
export class SalarieComponent implements OnInit {
  
  

  constructor(public service:SalarieService,
    public notificationService:NotificationService,
    public dialogRef:MatDialogRef<SalarieComponent>) { }
  

  ngOnInit() {
    this.service.getSalaries();
  }
  onClear(){
    this.service.form.reset();
    this.service.initializedFormGroup();
    
  }

  onSubmit(){
    if(!this.service.form.get('$key')?.value)
        this.service.insertSalarie(this.service.form.value);
          else
          this.service.updateSalarie(this.service.form.value);
    this.service.insertSalarie(this.service.form.value);
    this.service.form.reset();
    this.service.initializedFormGroup();
    this.notificationService.success(':: Submitted successfully');
    this.onClose();
   

  }
  onClose(){
    this.service.form.reset();
    this.service.initializedFormGroup();
    this.dialogRef.close();
  }

}
