import { ComponentFixture, TestBed } from '@angular/core/testing';
import { About } from './about';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct about project title', () => {
    const titleElement = fixture.debugElement.query(By.css('.about-project .header'))
      ?.nativeElement as HTMLElement;
    expect(titleElement?.textContent).toContain('About project');
  });

  it('should have about project description with links', () => {
    const description = fixture.debugElement.query(By.css('.about-project .description'))
      ?.nativeElement as HTMLElement;
    expect(description?.textContent).toContain('RS School Angular course');
    expect(description?.textContent).toContain('TMDB');
  });

  it('should have correct acknowledgements title', () => {
    const titleElement = fixture.debugElement.query(By.css('.acknowledgements .header'))
      ?.nativeElement as HTMLElement;
    expect(titleElement?.textContent).toContain('Acknowledgements');
  });

  it('should have acknowledgements content with links', () => {
    const acknowledgements = fixture.debugElement.query(By.css('.acknowledgements'))
      ?.nativeElement as HTMLElement;
    expect(acknowledgements?.textContent).toContain('Rolling Scopes School');
    expect(acknowledgements?.textContent).toContain('Pavel');
    expect(acknowledgements?.textContent).toContain('Maria');
  });

  it('should have team section with correct title', () => {
    const teamTitle = fixture.debugElement.query(By.css('.team .header'))
      ?.nativeElement as HTMLElement;
    expect(teamTitle?.textContent).toContain('Our team');
  });

  it('should render team members', () => {
    const teamMembers = fixture.debugElement.queryAll(By.css('.team-member'));
    expect(teamMembers.length).toBe(3);
  });

  it('should have correct team members names', () => {
    const teamMembers = fixture.debugElement.queryAll(By.css('.team-member .name'));
    expect(teamMembers[0].nativeElement.textContent).toContain('Maria Parinova');
    expect(teamMembers[1].nativeElement.textContent).toContain('Dzmitry Aliakseyeu');
    expect(teamMembers[2].nativeElement.textContent).toContain('Glib Shemenkov');
  });

  it('should have github links for team members', () => {
    const teamLinks = fixture.debugElement.queryAll(By.css('.team-members a'));
    expect(teamLinks[0].nativeElement.href).toContain('mariaparinova');
    expect(teamLinks[1].nativeElement.href).toContain('DzmitryAliakseyeu');
    expect(teamLinks[2].nativeElement.href).toContain('kravius');
  });

  it('should have target blank for team member links', () => {
    const teamLinks = fixture.debugElement.queryAll(By.css('.team-members a'));
    teamLinks.forEach((link) => {
      expect(link.nativeElement.target).toBe('_blank');
      expect(link.nativeElement.rel).toBe('noopener');
    });
  });
});
