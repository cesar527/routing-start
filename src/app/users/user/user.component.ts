import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscripton: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    //si los parametros cambian en cualquier lugar, actualizamos el usuario
    this.paramsSubscripton = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  //No es necesario, pero lo pongo para saber que angular lo hace asi,
  //si no se hiciera, las suscripciones se duplicarian cada vez
  // que el modulo se carge
  ngOnDestroy() {
    this.paramsSubscripton.unsubscribe();
  }
}
