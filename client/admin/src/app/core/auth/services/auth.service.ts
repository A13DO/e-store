import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { getAuth, signOut } from 'firebase/auth';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
// import { jwtDecode } from "jwt-decode";

export interface AuthResponseData  {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  uid?: string;
}
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCql3Npno578hxnzN5mjD4SHjyLcdkWe4U",
  authDomain: "e-commerce-86f86.firebaseapp.com",
  databaseURL: "https://e-commerce-86f86-default-rtdb.firebaseio.com",
  projectId: "e-commerce-86f86",
  storageBucket: "e-commerce-86f86.appspot.com",
  messagingSenderId: "919866914313",
  appId: "1:919866914313:web:e1ca6e0d2d57436551ead8",
  measurementId: "G-B84QYC3H4G"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  public isSignedIn: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public User = new BehaviorSubject<any>(null);

  constructor(private router: Router, private http: HttpClient) {}
  expirationTime: any;
  private tokenExpirationTimer:any ;
  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() =>
    {
    }, expirationDuration)
  }
  signIn(email: string, password: string) {
    // APi SignIN
    return this.http.post<any>("https://e-commerce-api-wvh5.onrender.com/api/v1/auth/login", {email, password})
  }
}
