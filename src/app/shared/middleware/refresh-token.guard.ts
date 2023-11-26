import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenGuard implements CanActivate {
  constructor(private router: Router,) {}

  canActivate(): boolean {
    return true;
  }
}