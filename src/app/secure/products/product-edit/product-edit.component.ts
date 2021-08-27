import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../interfaces/product";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      description: '',
      image: '',
      price: ''
    });

    this.id = this.route.snapshot.params.id;
    this.productService.get(this.id).subscribe((product: Product) => this.form.patchValue(product)); // no need to manually specify patch values foreach key-value pair.
  }

  submit(): void {
    // console.log(this.form.getRawValue());

    this.productService
      .update(this.id, this.form.getRawValue())
      .subscribe(() => this.router.navigate(['/products']));
  }
}
