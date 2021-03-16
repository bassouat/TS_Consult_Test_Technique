import { Component, OnInit, ViewChild } from '@angular/core';
import { SalarieService } from 'src/app/shared/salarie.service';
import{MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import{MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { SalarieComponent } from '../salarie/salarie.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-salarie-list',
  templateUrl: './salarie-list.component.html',
  styleUrls: ['./salarie-list.component.css']
})
export class SalarieListComponent implements OnInit {
  

  constructor(public service:SalarieService,public dialog:MatDialog,
    public notificationService:NotificationService,public dialogService:DialogService) { }

  listData:MatTableDataSource<any>;
  displayedColumns:string[]=['prenom','fonction','annees_XP','adresse','salaire','date_de_naissance','actions'];
  @ViewChild(MatSort) sort: MatSort; 
  @ViewChild(MatPaginator) paginator:MatPaginator;
  searchKey:string;

  ngOnInit() {
    this.service.getSalaries().subscribe(
      list=>{
        let array =list.map(item=>{
          return{
            $key:item.key,
            ...item.payload.val()
          };
          
        });
        this.listData=new MatTableDataSource(array);
        this.listData.sort=this.sort;
        this.listData.paginator=this.paginator;
      }
    );
  }

  onSearchClear(){
    this.searchKey="";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    this.service.initializedFormGroup();
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(SalarieComponent,dialogConfig);

  }

  onEdit(row){
    this.service.populateForm(row);
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(SalarieComponent,dialogConfig);
  }

  onDelete($key){
    /*if(confirm("are you sure to delete this record?")){
    this.service.deleteSalarie($key);
    this.notificationService.warn("! deleted successfully");*/
    this.dialogService.openConfirmDialog("Etes vous sur de vouloir supprimer cet enregistrement svp?")
    .afterClosed().subscribe(res =>{
      console.log(res);
    });
    
    }

  }


