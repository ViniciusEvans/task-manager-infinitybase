import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1717805434506 implements MigrationInterface {
    name = 'InitialSetup1717805434506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_role_user_permission_level_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "users_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_permission_level" "public"."users_role_user_permission_level_enum" NOT NULL, "user_id" uuid, "board_id" uuid, CONSTRAINT "PK_a2cecd1a3531c0b041e29ba46e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" text NOT NULL, "board_id" uuid, CONSTRAINT "PK_b8747cc6a41b6cef4639babf61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "attachment_url" text NOT NULL, "task_id" uuid, CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "user_id" uuid, "board_id" uuid, "task_status_id" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_role" ADD CONSTRAINT "FK_dff1fd3973cc325e58d8b1f5007" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_role" ADD CONSTRAINT "FK_705d220b7047cb1e41bd467bc81" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task_status" ADD CONSTRAINT "FK_77825b495e71d7395194b65c7b2" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_e62fd181b97caa6b150b09220b1" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_42a2758d8eff27aa9f58b642c21" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_766c174180b4651d3210968cbd6" FOREIGN KEY ("task_status_id") REFERENCES "task_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_766c174180b4651d3210968cbd6"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_42a2758d8eff27aa9f58b642c21"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`);
        await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_e62fd181b97caa6b150b09220b1"`);
        await queryRunner.query(`ALTER TABLE "task_status" DROP CONSTRAINT "FK_77825b495e71d7395194b65c7b2"`);
        await queryRunner.query(`ALTER TABLE "users_role" DROP CONSTRAINT "FK_705d220b7047cb1e41bd467bc81"`);
        await queryRunner.query(`ALTER TABLE "users_role" DROP CONSTRAINT "FK_dff1fd3973cc325e58d8b1f5007"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "task_status"`);
        await queryRunner.query(`DROP TABLE "users_role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_user_permission_level_enum"`);
    }

}
