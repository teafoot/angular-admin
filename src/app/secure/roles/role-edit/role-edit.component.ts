import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Permission} from "../../../interfaces/permission";
import {PermissionService} from "../../../services/permission.service";
import {RoleService} from "../../../services/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "../../../interfaces/role";

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.css']
})
export class RoleEditComponent implements OnInit {
  form: FormGroup;
  permissions: Permission[] = [];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
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

    // load data into form
    this.id = this.route.snapshot.params.id;
    this.roleService.get(this.id).subscribe((role: Role) => {
        // console.log(role);
        this.form.patchValue({
          name: role.name,
          permissions: this.permissions.map((permission: Permission) => {
              const checkValue = role.permissions.some(rolePermission => rolePermission.id === permission.id); // true if at least one rolePermission matches the permission id.
              return {
                checkValue,
                checkId: permission.id
              };
          }) // permissions: [{checkValue: boolean, checkId: int}, {...}]
        });
      }
    );
  }

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  submit(): void {
    const formData = this.form.getRawValue();
    // console.log({formData});
    const data = {
      name: formData.name,
      permissions: formData.permissions
        .filter((permission: any) => permission.checkValue) // allow with property true
        .map((permission: any) => permission.checkId) // [int, int, int...]
    };
    // console.log({data});

    this.roleService
      .update(this.id, data)
      .subscribe(() => this.router.navigate(['/roles']));
  }
}
