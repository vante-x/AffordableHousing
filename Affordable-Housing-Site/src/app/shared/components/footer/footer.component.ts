import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { menuList as staticMenuList } from '../../data/menus';

@Component({
  selector: 'll-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() topFixed: boolean = false;
  @Output() toggleSidenav = new EventEmitter();
  isScrolled: boolean = false;
  menuList : any[] = [];

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.menuList = staticMenuList;

  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isScrolled = window.pageYOffset > 15;
  }
}


