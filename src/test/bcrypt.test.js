import bcrypt from "bcrypt";

describe("Test unitario - Encriptación", () => {

  test("Debe encriptar correctamente una contraseña", async () => {
    const password = "123456";
    const hash = await bcrypt.hash(password, 10);

    const isValid = await bcrypt.compare(password, hash);

    expect(isValid).toBe(true);
  });

});