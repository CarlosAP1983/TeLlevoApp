import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';

import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: AngularFireStorage) {}

  // Subir la imagen de perfil del usuario
  uploadProfileImage(file: File, userId: string): Observable<string> {
    const filePath = `profile_images/${userId}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Observa el estado de la subida y obtiene la URL al finalizar
    return new Observable<string>(observer => {
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url: string) => {
            observer.next(url);
            observer.complete();
          });
        })
      ).subscribe();
    });
  }
}
