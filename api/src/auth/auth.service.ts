import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { MailService } from 'src/mail/mail.service';
import { resetMyPassDto } from 'src/dto/resetPasswordDto';

@Injectable()
export class AuthService {
  private readonly client: OAuth2Client;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {
    this.client = new OAuth2Client(
      '335638704279-dg7t8s2qnmrogjkj3lkfo6jbfste7417.apps.googleusercontent.com',
    );
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.find_user(username);
    if (!user) {
      throw new UnauthorizedException('E-mail não encontrado');
    }
    const passwordIsValid = bcrypt.compareSync(pass, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('A senha digitada é inválida');
    }
    return {
      user,
      access_token: await this.jwtService.signAsync({
        sub: user.email,
        username: user.name,
      }),
    };
  }
  async verify_google_token(access_token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: access_token,
        audience:
          '335638704279-dg7t8s2qnmrogjkj3lkfo6jbfste7417.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();

      const user = await this.userService.find_user(payload.email);
      if (!user) {
        return this.userService.add_user({
          name: payload.name,
          email: payload.email,
          fromGoogle: true,
          googlePicture: payload.picture,
        });
      }
      return {
        user: {
          name: payload.name,
          email: payload.email,
        },
        access_token: await this.jwtService.signAsync({
          sub: payload.email,
          username: payload.name,
        }),
      };
    } catch (error) {
      console.log(error);
    }
  }
  async reset_user_password(email: string) {
    try {
      if(!email) throw new UnauthorizedException('E-mail não pode ser vazio!');
      const [isValidEmail, userExists] = await Promise.all([
        this.userService.is_valid_email(email),
        this.userService.find_user(email)
      ])
      if(!isValidEmail) throw new UnauthorizedException('E-mail inválido!');
      if(userExists === null) throw new UnauthorizedException('E-mail não encontrado!');

      const token = await this.jwtService.signAsync({email},{expiresIn: '15m'})
      const resetLink = `http://localhost:3000/user/resetar-senha?token=${token}`;

      await this.mailService.sendEmail(
        email,
        'Redefinir sua senha',
        'Clique no link para resetar sua senha.',
        `
          <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
            <h2 style="color: #ff6600;">Redefinição de Senha</h2>
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
            <p>Para continuar, clique no botão abaixo:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #ff6600; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Redefinir Senha
            </a>
            <p style="margin-top: 20px;">Se você não solicitou essa alteração, pode ignorar este e-mail.</p>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
            <small style="color: #888;">Este link expira em 15 minutos por segurança.</small>
          </div>
        `
      );
    } catch (e) {
      throw e;
    }
  }

  async reset_my_pass(resetData: resetMyPassDto){
    const token = await this.jwtService.verifyAsync(resetData.token)
    const resetPassUser = await this.userService.find_user(token.email)
    const cryptPass = await bcrypt.hash(resetData.pass, 12)
    resetPassUser.password = cryptPass

    resetPassUser.save()
  }
  async signIn_google() {}
}
