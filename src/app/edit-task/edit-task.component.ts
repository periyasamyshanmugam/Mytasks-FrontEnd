import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  taskForm: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, private message: NzMessageService) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      'title': new FormControl(null),
      'details': new FormControl(null),
      'date': new FormControl(null),
      'subTasks': new FormArray([]),
    });
  }

  goBack() {
    this.submitDetails();
    this.router.navigate(['/']);
  }

  deleteTask() {

  }

  submitDetails() {
    const subtaskArray = [];
    for (let i = 0; i < (<FormArray>this.taskForm.get('subTasks')).length; i++) {
      subtaskArray.push({
        bool: this.taskForm.get('subTasks.' + i + '.bool').value,
        task: this.taskForm.get('subTasks.' + i + '.task').value
      });
    }
    const payload = {
      title: this.taskForm.get('title').value,
      details: this.taskForm.get('details').value,
      date: this.taskForm.get('date').value,
      subTasks: subtaskArray
    };
  }

  addSubTask() {
    const control = new FormGroup({
      'task': new FormControl(null),
      'bool': new FormControl(false),
    });
    (<FormArray>this.taskForm.get('subTasks')).push(control);
    this.message.info('SubTask Added');
    console.log((<FormArray>this.taskForm.get('subTasks')).length, '$$$$$$$$$$$$$');
  }
  get getTasks() {
    return <FormArray>this.taskForm.get('subTasks');
  }
  completed(i) {
    this.deleteSubTask(i);
  }
  deleteSubTask(i) {
    (<FormArray>this.taskForm.get('subTasks')).removeAt(i);
    this.message.info('SubTask Deleted');
  }
}
