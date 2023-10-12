DROP SCHEMA ctr CASCADE;
CREATE SCHEMA IF NOT EXISTS ctr;

CREATE TABLE IF NOT EXISTS ctr.tenant (
  cod VARCHAR(9) PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  descr VARCHAR(60) DEFAULT '',
  active BOOLEAN DEFAULT TRUE
);

INSERT INTO ctr.tenant (cod, "name")
VALUES ('default','Example Ltd.');

CREATE TABLE IF NOT EXISTS ctr.setting (
  "key" VARCHAR(30) PRIMARY KEY,
  "value" VARCHAR(30) NOT NULL,
  grp VARCHAR(30),
  descr VARCHAR(60) DEFAULT '',
  active BOOLEAN DEFAULT TRUE
);

ALTER TABLE ctr.setting ADD COLUMN tenant_cod VARCHAR(9) DEFAULT 'default';
ALTER TABLE ctr.setting ADD FOREIGN KEY (tenant_cod)
  REFERENCES ctr.tenant(cod);

INSERT INTO ctr.setting ("key", "value", grp)
VALUES ('lang', 'en', '');


CREATE TABLE IF NOT EXISTS ctr.role (
  cod VARCHAR(6) PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  descr VARCHAR(60) DEFAULT '',
  access VARCHAR(240) DEFAULT '',
  active BOOLEAN DEFAULT TRUE
);

INSERT INTO ctr.role (cod, "name", access)
VALUES
  ('super', 'super', ''),
  ('admin', 'admin', ''),
  ('user', 'user', ''),
  ('guest', 'guest', '');
