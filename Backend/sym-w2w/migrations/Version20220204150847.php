<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220204150847 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs

        //CREAR TODAS LAS TABLAS
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, password VARCHAR(255) NOT NULL, rol VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_1483A5E9F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content (id INT AUTO_INCREMENT NOT NULL, id_content INT DEFAULT NULL, title VARCHAR(255) NOT NULL, cover VARCHAR(255) NOT NULL, media_type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content_list (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, icon VARCHAR(255) NOT NULL, user_id INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content_list_content (content_list_id INT NOT NULL, content_id INT NOT NULL, PRIMARY KEY(content_list_id, content_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        //PONER LAS FK DE LAS TABLAS QUE LO NECESITEN
        $this->addSql('ALTER TABLE content_list ADD CONSTRAINT FK_89AA15DDA76ED395 FOREIGN KEY (id_user) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE content_list_content ADD CONSTRAINT FK_2602E11BE2A6CF38 FOREIGN KEY (content_list_id) REFERENCES content_list (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE content_list_content ADD CONSTRAINT FK_2602E11B84A0A3ED FOREIGN KEY (content_id) REFERENCES content (id) ON DELETE CASCADE');
        //INSERTAR 2 USUARIOS
        $this->addSql('insert into users (username,password,rol) values ("admin", "$argon2id$v=19$m=65536,t=4,p=1$0fvkXpHdHuS1IIPYeqj/Tg$WoCUkN4zRl80TedHReCeYruDEd0+cfEwqKoasZCzZGI", "ROLE_ADMIN")' );
        $this->addSql('insert into users (username,password,rol) values ("ander", "$argon2id$v=19$m=65536,t=4,p=1$0fvkXpHdHuS1IIPYeqj/Tg$WoCUkN4zRl80TedHReCeYruDEd0+cfEwqKoasZCzZGI", "ROLE_USER")' );
        //INSERTAR 4 PELICULAS/SERIES DE TMBD
        $this->addSql('insert into content (id_content,title,cover,media_type) values (774825, "The Ice Age Adventures of Buck Wild", "/iJDPnoZ7IafVxrxq0qRUsoBINoR.jpg", "movie")' );
        $this->addSql('insert into content (id_content,title,cover,media_type) values (85552, "Euphoria", "/288q0JefZUuTfqUG2qzPTCZYuAL.jpg", "tv")' );
        $this->addSql('insert into content (id_content,title,cover,media_type) values (99966, "Estamos muertos", "/erEJz0JgS3pVZAl7fl38cShK1Bs.jpg", "tv")' );
        $this->addSql('insert into content (id_content,title,cover,media_type) values (85552, "Euphoria", "/288q0JefZUuTfqUG2qzPTCZYuAL.jpg", "tv")' );
        //INSERTAR 4 LISTAS PARA LOS 2 USUARIOS
        $this->addSql('insert into content_list (title,icon,user_id) values ("Me gusta", "heart", 1)' );
        $this->addSql('insert into content_list (title,icon,user_id) values ("Me gusta", "heart", 2)' );
        $this->addSql('insert into content_list (title,icon,user_id) values ("Vistas", "heart", 1)' );
        $this->addSql('insert into content_list (title,icon,user_id) values ("Comedia", "heart", 2)' );
        //INSERTAR LAS RELACIONES DE LAS PELICULAS/SERIES CON LAS LISTAS
        $this->addSql('insert into content_list_content (content_list_id,content_id) values (1,1)' );
        $this->addSql('insert into content_list_content (content_list_id,content_id) values (2,2)' );
        $this->addSql('insert into content_list_content (content_list_id,content_id) values (2,3)' );
        $this->addSql('insert into content_list_content (content_list_id,content_id) values (3,4)' );

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE content');
        $this->addSql('DROP TABLE content_list');
        $this->addSql('DROP TABLE content_list_content');
    }
}
