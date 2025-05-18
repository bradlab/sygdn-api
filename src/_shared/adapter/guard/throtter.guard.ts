import { Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { ThrottlerGuard, ThrottlerModuleOptions, ThrottlerStorage } from "@nestjs/throttler";

// Étendez ThrottlerGuard pour gérer le contexte GraphQL
@Injectable() // Rendez la classe injectable
export class GqlThrottlerGuard extends ThrottlerGuard {
  constructor(
    options: ThrottlerModuleOptions, // Options sont injectées par ThrottlerModule
    storageService: ThrottlerStorage, // Storage est injecté par ThrottlerModule
    reflector: Reflector, // Reflector est injecté par NestJS
  ) {
    // Appelez le constructeur parent avec les dépendances injectées
    super(options, storageService, reflector);
  }

  // Override la méthode getTracker pour extraire l'IP du contexte GraphQL
  protected getTracker(req: Record<string, any>): Promise<string> {
    // Tente d'obtenir le contexte GraphQL
    const gqlContext = GqlExecutionContext.create(req as any);
    // Extrait l'objet de requête HTTP sous-jacent du contexte GraphQL
    const request = gqlContext.getContext().req;

    // Si nous sommes dans un contexte HTTP (pas GraphQL), utilisez l'IP standard
    if (!request) {
       // Fallback pour les contextes non-HTTP si nécessaire
       console.warn('GqlThrottlerGuard received a non-HTTP/non-GQL context');
       return null as any; // Ou une autre logique de gestion
    }

    // Retourne l'adresse IP du client.
    return request?.ip;
  }
}