import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormControlName, FormGroup} from "@angular/forms";
import {RoleService} from "../../../services/role.service";
import {Router} from "@angular/router";
import {PermissionService} from "../../../services/permission.service";
import {Permission} from "../../../interfaces/permission";

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;
  permissions: Permission[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([])
    });

    this.permissionService.all().subscribe(
      permissions => {
        this.permissions = permissions;
        this.permissions.forEach((permission: Permission) => {
          this.permissionArray.push(
            this.formBuilder.group({
              checkValue: false, // unchecked by default
              checkId: permission.id
            })
          );
        });
      }
    );
  }

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  submit(): void {
    // console.log(this.form.getRawValue());
    const formData = this.form.getRawValue();
    const data = {
      name: formData.name,
      permissions: formData.permissions
        .filter((permission: any) => permission.checkValue) // get truthy checkboxes
        .map((permission: any) => permission.checkId) // get checkbox/permission id
    };
    console.log(data);

    this.roleService
      .create(data)
      .subscribe(() => this.router.navigate(['/roles']));
  }
}
