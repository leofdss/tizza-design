import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface Task {
  name: string;
  completed: boolean;
  color: string;
  subtasks?: Task[];
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    ul {
      list-style-type: none;
      margin-top: 4px;
    }
  `]
})
export class DemoComponent implements OnInit {

  form = new FormGroup({
    text: new FormControl(),
    textDisabled: new FormControl({ value: null, disabled: true }),
    number: new FormControl(),
    password: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    textarea: new FormControl(),
    checkbox: new FormControl(true),
    checkboxIndeterminate: new FormControl(true),
    switch: new FormControl(true),
    radio: new FormControl('opcao2'),
    checkboxDisabled: new FormControl({ value: true, disabled: true }),
    switchDisabled: new FormControl({ value: true, disabled: true }),
    radioDisabled: new FormControl({ value: 'opcao1', disabled: true })
  });
  allComplete = false;

  ngOnInit() { }

  onSubmit() {
    console.log(this.form?.value);
  }

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Success', completed: false, color: 'success' },
      { name: 'Info', completed: false, color: 'info' },
      { name: 'Warning', completed: false, color: 'warning' },
      { name: 'Danger', completed: false, color: 'danger' }
    ]
  };

  updateAllComplete() {
    this.allComplete = !!(this.task?.subtasks?.every(t => t.completed));
  }

  someComplete(): boolean {
    if (!this.task.subtasks) {
      return false;
    }
    return this.task?.subtasks?.filter(t => t.completed)?.length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.task.subtasks?.forEach(subtask => subtask.completed = completed);
  }
}
