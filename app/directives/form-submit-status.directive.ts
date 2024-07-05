import { Directive, Input, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Directive({
  selector: '[appFormSubmitStatus]'
})
export class FormSubmitStatusDirective implements OnInit, OnDestroy {
  @Input('appFormSubmitStatus') form!: NgForm; // Input binding for NgForm
  @Input() navigateTo!: string; // Input binding for navigation path

  private formSubmitSubscription!: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'gray');

    this.formSubmitSubscription = this.form.ngSubmit.subscribe(() => {
      if (this.form.valid) {
        this.enableButton();
      }
    });

    this.renderer.listen(this.el.nativeElement, 'click', () => {
      if (!this.el.nativeElement.disabled) {
        this.router.navigate([this.navigateTo]);
      }
    });
  }

  ngOnDestroy() {
    if (this.formSubmitSubscription) {
      this.formSubmitSubscription.unsubscribe();
    }
  }

  private enableButton() {
    this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'green');
    this.renderer.setProperty(this.el.nativeElement, 'innerText', 'Go To Next Form');
  }
}
