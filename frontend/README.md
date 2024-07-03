## Learning Note

### Create project by Vite

依照語言喜好建立對應的 react project

```ts
npm create vite@latest  {YOUR PROJECT NAME} -- --template react
npm create vite@latest  {YOUR PROJECT NAME} -- --template react-ts
```

CHANGE **{YOUR PROJECT NAME}** TO REAL PROJECT NAME

### Tailwind Setup

專案是使用 Vite 建立，可以直接依照[官網的步驟](https://tailwindcss.com/docs/guides/create-react-app)即可

### Form

- 原生取資料的方式
  
  > 要注意每一個 name 都需要是 unique，否則會被覆蓋

```ts
const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // get all element from form element
        const formElements = e.currentTarget.elements;

        // create object to store data
        const formData: { [key: string]: string } = {};

        // loop to pass the data from every element into formData object
        for (let i = 0; i < formElements.length; i++) {
            const input = formElements[i] as HTMLInputElement;
            if (input.name && input.type !== 'button' && input.type !== 'submit') {
                formData[input.name] = input.value;
            }
        }
        console.log(formData);
    }
```

- 使用 [reacthookform](https://www.react-hook-form.com/) 取資料的方式

    `npm install react-hook-form`
  
    這個 hook 太棒了，完全可以省略掉不必要的迴圈

    .ts 檔案內只是單純用了 `useForm`，且宣告的一個 `interface` 和 `defaultValues`

    ```ts
    interface RegisterProps {
    text: string;
    email: string;
    password: string;
    confirmPassword: string;

    }

    const defaultValues: RegisterProps = {
        text: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const { register, handleSubmit } = useForm({ defaultValues });

    const submit = (data: RegisterProps) => {
        console.log(data);
        // e.preventDefault();
        // const formElements = e.currentTarget.elements;
        // const formData: { [key: string]: string } = {};
        // for (let i = 0; i < formElements.length; i++) {
        //     const input = formElements[i] as HTMLInputElement;
        //     if (input.name && input.type !== 'button' && input.type !== 'submit') {
        //         formData[input.name] = input.value;
        //     }
        // }
        // console.log(formData);
    }
    ```

    .tsx 只要把原本寫 `name` 的地方改為 `require` 的語法就可以了

    ```tsx
        <form onSubmit={handleSubmit(submit)} >
                    <input {...register('text')}  />
                    <input {...register('email')}  />
                    <input {...register('password')}  />
                    <input {...register('confirmPassword')}  />
                    </form>
    ```