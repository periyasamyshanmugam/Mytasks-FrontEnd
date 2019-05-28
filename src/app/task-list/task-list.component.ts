import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { MytaskService } from '../services/mytask.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskForm: FormGroup;
  userList;

  constructor(private fb: FormBuilder, private message: NzMessageService, public route: Router,
    public service: MytaskService) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe((response) => {
      this.userList = response.json().data;
      console.log(this.userList, '###########3');
    });
    this.taskForm = this.fb.group({
      'tasks': new FormArray([]),
    });

  }

  addTask() {
    const control = new FormGroup({
      'task': new FormControl(null),
      'bool': new FormControl(false),
    });
    (<FormArray>this.taskForm.get('tasks')).push(control);
    this.message.info('Task Added');
    console.log((<FormArray>this.taskForm.get('tasks')).length, '$$$$$$$$$$$$$');
  }

  get getTasks() {
    return <FormArray>this.taskForm.get('tasks');
  }
  editTask(i) {
    this.route.navigate(['/edit-task'], { queryParams: { id: i } });
    console.log(i, 'edit task');
  }
  completed(i) {
    this.deleteTask(i);
  }
  deleteTask(i) {
    (<FormArray>this.taskForm.get('tasks')).removeAt(i);
    this.message.info('Task Deleted');
  }
  createBasicMessage(msg): void {
    this.message.info(msg, {
      nzDuration: 2000
    });
  }

}
