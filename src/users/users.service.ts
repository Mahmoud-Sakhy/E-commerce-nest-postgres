@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  delete(id: string) {
    return this.userRepo.delete(id);
  }

  update(id: string, data: any) {
    return this.userRepo.update(id, data);
  }
}