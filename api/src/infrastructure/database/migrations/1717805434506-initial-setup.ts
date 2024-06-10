import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSetup1717805434506 implements MigrationInterface {
  name = "InitialSetup1717805434506";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_user_permission_level_enum" AS ENUM('ADMIN', 'USER')`
    );
    await queryRunner.query(
      `CREATE TABLE "users_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_permission_level" "public"."users_role_user_permission_level_enum" NOT NULL, "user_id" uuid, "board_id" uuid, CONSTRAINT "PK_a2cecd1a3531c0b041e29ba46e1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "task_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" text NOT NULL, "board_id" uuid, CONSTRAINT "PK_b8747cc6a41b6cef4639babf61d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "attachment_url" text NOT NULL, "task_id" uuid, CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "user_id" uuid, "board_id" uuid, "task_status_id" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "password" text NOT NULL, "email" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users_role" ADD CONSTRAINT "FK_dff1fd3973cc325e58d8b1f5007" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users_role" ADD CONSTRAINT "FK_705d220b7047cb1e41bd467bc81" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task_status" ADD CONSTRAINT "FK_77825b495e71d7395194b65c7b2" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" ADD CONSTRAINT "FK_e62fd181b97caa6b150b09220b1" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_42a2758d8eff27aa9f58b642c21" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_766c174180b4651d3210968cbd6" FOREIGN KEY ("task_status_id") REFERENCES "task_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`INSERT INTO "user"(id, name, email, password)
    VALUES ('340ba8e3-eaaf-4132-862f-d239504c41da', 'teste', 'teste@gmail.com','$2a$10$OA5VvPSKCdjkKjt0HkMFaOZPnWrRTGirE.6Dj5nKHaqeMVdo.xQNO')`);
    await queryRunner.query(`INSERT INTO "user"(id, name, email, password)
    VALUES ('80c4508b-162b-48eb-9e9d-5c56a06b3e8b', 'user para add', 'adduser@gmail.com','$2a$10$OA5VvPSKCdjkKjt0HkMFaOZPnWrRTGirE.6Dj5nKHaqeMVdo.xQNO')`);
    await queryRunner.query(`INSERT INTO "user"(id, name, email, password)
    VALUES ('58bf4970-5a94-492d-bd11-2462d60cc68f', 'user para add', 'adduser@gmail.com','$2a$10$OA5VvPSKCdjkKjt0HkMFaOZPnWrRTGirE.6Dj5nKHaqeMVdo.xQNO')`);
    await queryRunner.query(`INSERT INTO board (id, name)
    VALUES('5e3a3c80-b64d-4ff1-aecd-4a76ef18abe0', 'Baord 1')`);
    await queryRunner.query(`INSERT INTO users_role (id, user_permission_level, board_id, user_id)
    VALUES('16393f5c-9695-472e-82e8-5c5f5dabe2f8', 'ADMIN', '5e3a3c80-b64d-4ff1-aecd-4a76ef18abe0', '340ba8e3-eaaf-4132-862f-d239504c41da')`);
    await queryRunner.query(`INSERT INTO task_status (id, status, board_id)
    VALUES('8736ec84-64d4-45de-91e2-fd2a6fee9c3c', 'TO DO', '5e3a3c80-b64d-4ff1-aecd-4a76ef18abe0')`);
    await queryRunner.query(`INSERT INTO task_status (id, status, board_id)
    VALUES('511fef4e-5b93-46bb-b025-52ede1e9923e', 'IN PROGRESS', '5e3a3c80-b64d-4ff1-aecd-4a76ef18abe0')`);
    await queryRunner.query(`INSERT INTO task_status (id, status, board_id)
    VALUES('30828739-cdf6-462d-b875-9d7250823bac', 'COMPLETED', '5e3a3c80-b64d-4ff1-aecd-4a76ef18abe0')`);
    await queryRunner.query(`INSERT INTO task (id, title, description, user_id, board_id, task_status_id)
    VALUES(
    'ac045282-b29e-490a-806e-e631270a6d59', 
    'Fazer bolo de cenoura', 
    'Fazer bolo de cenoura seguinda receita da Palmirinha', 
    '340ba8e3-eaaf-4132-862f-d239504c41da', 
    '5e3a3c80-b64d-4ff1-aecd-4a76ef18abe0', 
    '8736ec84-64d4-45de-91e2-fd2a6fee9c3c')`);
    await queryRunner.query(`  INSERT INTO task (id, title, description, user_id, board_id, task_status_id)
    VALUES(
    '490a842c-f679-4d8a-a815-95b8f71d93b9', 
    'Enviar teste técnico', 
    'Desenvolver e enviar o teste técnico da InfinityBase', 
    '340ba8e3-eaaf-4132-862f-d239504c41da', 
    '5e3a3c80-b64d-4ff1-aecd-4a76ef18abe0', 
    '30828739-cdf6-462d-b875-9d7250823bac')`);
    }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_766c174180b4651d3210968cbd6"`
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_42a2758d8eff27aa9f58b642c21"`
    );
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_6ea2c1c13f01b7a383ebbeaebb0"`
    );
    await queryRunner.query(
      `ALTER TABLE "attachments" DROP CONSTRAINT "FK_e62fd181b97caa6b150b09220b1"`
    );
    await queryRunner.query(
      `ALTER TABLE "task_status" DROP CONSTRAINT "FK_77825b495e71d7395194b65c7b2"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_role" DROP CONSTRAINT "FK_705d220b7047cb1e41bd467bc81"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_role" DROP CONSTRAINT "FK_dff1fd3973cc325e58d8b1f5007"`
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TABLE "attachments"`);
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`DROP TABLE "task_status"`);
    await queryRunner.query(`DROP TABLE "users_role"`);
    await queryRunner.query(
      `DROP TYPE "public"."users_role_user_permission_level_enum"`
    );
  }
}
