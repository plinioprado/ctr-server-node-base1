DROP TABLE IF EXISTS ctr.user;

CREATE TABLE IF NOT EXISTS ctr.user (
  id SERIAL PRIMARY KEY,
  "name" VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  pass VARCHAR(60) NOT NULL,
  active BOOLEAN DEFAULT TRUE,
  role_cod VARCHAR(6) NOT NULL DEFAULT 'guest',
  tenant_cod VARCHAR(9) DEFAULT 'default'
);

ALTER TABLE ctr.user ADD FOREIGN KEY (role_cod)
  REFERENCES ctr.role(cod);
ALTER TABLE ctr.user ADD FOREIGN KEY (tenant_cod)
  REFERENCES ctr.tenant(cod);

INSERT INTO ctr.user
  (name, email, pass, role_cod)
VALUES
  ('Super User', 'super@example.com', '12345', 'super'),
  ('Admin User', 'admin@example.com', '12345', 'admin'),
  ('User User', 'user@example.com', '12345', 'user'),
  ('Guest User', 'guest@example.com', '12345', 'guest');
