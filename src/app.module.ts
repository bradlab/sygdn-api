import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomValidationPipe } from 'adapter/pipe/custom-validator.pipe';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { SeedsModule } from './_seeder/seeds.module';
import { UserModule } from 'user/user.module';
import { DomainModule } from './domain/domain.module';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { GqlThrottlerGuard } from 'adapter/guard/throtter.guard';
import { StepModule } from 'step/step.module';
import { DossierModule } from 'dossier/dossier.module';
import { DossierStepModule } from 'dossier-step/dossier-step.module';
import { TaskModule } from 'task/task.module';
import { AffectationModule } from 'affectation/affectation.module';
import { CommentModule } from 'comment/comment.module';
import { StatistiqueModule } from './statistique/statistique.module';

@Module({
  imports: [
    UserModule,
    DomainModule,
    StepModule,
    DossierModule,
    DossierStepModule,
    TaskModule,
    AffectationModule,
    CommentModule,
    StatistiqueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class IAppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.dev.env', //.dev.env, .prod.env
      expandVariables: true,
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          filename: `winston/error.log`,
          level: 'error',
        }),
        new winston.transports.File({
          filename: `winston/combine.log`,
          // level: 'combine',
        }),
        new winston.transports.File({
          filename: `winston/debug.log`,
          level: 'debug',
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
            winston.format.timestamp(),
            winston.format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true, // Chemin où le schéma sera généré
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Chemin où le schéma sera généré
      sortSchema: true, // Trie le schéma généré
      graphiql: true, // Active l'interface graphique interactive (GraphQL Playground) en mode dev
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +(process.env.DB_PORT ?? 5432),
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      logger: 'advanced-console',
      logging: ['error'],
      synchronize: process.env.NODE_ENV != 'prod',
      autoLoadEntities: true,
      ssl: process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'prod',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),

    IAppModule,
    SeedsModule,
    // ThrottlerModule.forRoot([
    //   {
    //     name: 'short',
    //     ttl: 2 * 60 * 1000, // 2 minutes,
    //     limit: 50,
    //   },
    //   {
    //     name: 'medium',
    //     ttl: 5 * 60 * 1000, // 5 minutes,
    //     limit: 200,
    //   },
    //   {
    //     name: 'long',
    //     ttl: 60 * 60 * 1000, // 1 heure,
    //     limit: 2000,
    //   },
    // ]),
  ],
  providers: [
    AppService,
    { provide: APP_PIPE, useClass: CustomValidationPipe },
    // {
    //   provide: APP_GUARD,
    //   useClass: GqlThrottlerGuard,
    // },
  ],
})
export class AppModule {}
