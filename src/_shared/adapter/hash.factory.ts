import * as bcrypt from 'bcrypt';

export abstract class HashFactory {
  static async hashPwd(password: string): Promise<string | null> {
    if (password) {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    }
    return null;
  }

  static async isRightPwd(password: string, pass: string): Promise<boolean> {
    if (password && pass)
      return (await bcrypt.compare(password, pass));
    return false;
  }
}
