import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    genders = ['male', 'female'];
    signupForm: FormGroup;
    existingUserNames = ['Chris', 'Anna'];

    ngOnInit() {
        this.signupForm = new FormGroup({
            'userData': new FormGroup({
                'username': new FormControl(null, [Validators.required, this.forbiddenNames]),
                'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
            }),
            'gender': new FormControl('male'),
            'hobbies': new FormArray([])
        });
    }

    onSubmit() {
        console.log(this.signupForm);
        console.log(this.existingUserNames.indexOf('asdf'));
    }

    onAddHobby() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.signupForm.get('hobbies')).push(control);
    }

    get formData() {
        return <FormArray>this.signupForm.get('hobbies');
    }

    // custom validator
    // the following  validator will check if the given form control doesn't have any string in the given array
    forbiddenNames = (control: FormControl): { [s: string]: boolean } => {
        if (this.existingUserNames.indexOf(control.value) !== -1) {
            return {'nameIsForbidden': true};
        }
        return null;
    }

    forbiddenEmails = (control: FormControl): Promise<any> | Observable<any> => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'test@test.com') {
                    resolve({'emailIsForbidden': true});
                }
                resolve(null);
            }, 1500);
        });
        return promise;
    }
}
