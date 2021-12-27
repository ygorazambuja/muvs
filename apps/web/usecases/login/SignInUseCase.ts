import { IHttp } from 'apps/web/infra/interfaces/IHttp';
import { BASE_URL } from '../../constants';
import { ISignInDTO } from './dto';

export class SignInUseCase {
  constructor(private httpClient: IHttp, private signInDTO: ISignInDTO) {}

  async execute() {
    const { data } = await this.httpClient.post(
      `${BASE_URL}/user/signin`,
      this.signInDTO
    );

    return data;
  }
}
