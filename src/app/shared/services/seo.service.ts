import { Injectable } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Injectable({ providedIn: 'root' })
@Injectable({
  providedIn: 'root'
})
export class SeoService {

  /***********************************************************/
  /**************   ⬇️    CONSTRUCTEUR    ⬇️   **************/
  /**********************************************************/

  /**
   * Constructeur du service SEO.
   * @param titlePlatformService - Le service d'Angular pour gérer le titre de la page.
   * @param metaPlatformService - Le service d'Angular pour gérer les balises meta de la page.
   */
  constructor(private titlePlatformService: Title, private metaPlatformService: Meta) {}

  /******************************************************/
  /**************   ⬇️    SETTERS    ⬇️   **************/
  /*****************************************************/

  /**
   * Définit le titre de la page.
   * @param title - Le titre de la page.
   */
  public setTitle(title: string): void { this.titlePlatformService.setTitle(title); }

  /**
   * Définit les balises meta de la page.
   * @param tags - Les balises meta de la page.
   */
  public setMetaTags(tags: { [key: string]: string }): void {

    /*
     * Pour chaque balise meta, on met à jour la balise correspondante.
     */
    Object.keys(tags).forEach((key) => {
      this.metaPlatformService.updateTag({ name: key, content: tags[key] });
    });
  }

  /**
   * Définit les données SEO de la page.
   * @param title - Le titre de la page.
   * @param metaTags - Les balises meta de la page.
   */
  public setSeoData(title: string, metaTags: { [key: string]: string }): void {

    this.setTitle(title); // On définit le titre de la page
    this.setMetaTags(metaTags); // On définit les balises meta de la page
  }
}

