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

- 使用 [ReactHookForm](https://www.react-hook-form.com/) 取資料的方式

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

    ReactHookForm 還有兩個很棒的功能 `watch` 和 `error`

    ```ts
    const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues });
    ```

    `watch` 用於監視某個欄位的資料異動

    ```ts
    console.log(watch("example"));
    ```

    `error` 用於了解目前的 form 有無任何錯誤訊息，具體的細節可以看 [Apply validation 章節](https://react-hook-form.com/get-started#Applyvalidation)

    ```tsx
     {errors.exampleRequired && <span>This field is required</span>}
    ```

    除了 ReactHookForm 本身提供的 error 可以查看錯誤訊息以外，也可以使用 [Zod](https://github.com/colinhacks/zod) 作為驗證的工具

    需注意的是，如果使用 Zod 為驗證工具，還需要額外再安裝 [resolvers](https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod)

    ```ts
    // 定義 json object schema
    const registerSchema = z.object({
        userName: z.string().min(1),
        email: z.string().email('無效的 email 格式'),
        password: z.string().min(6),
        confirmPassword: z.string().min(6)
    });

    // 使用 json object schema 推論型別，讓程式碼可以更精簡更好讀
    type RegisterProps = z.infer<typeof registerSchema>;

    // 須加上 zodResolver 才可以正常運作
    // resolver: zodResolver(registerSchema)
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterProps>({ defaultValues, resolver: zodResolver(registerSchema) });

    ```

    實作驗證功能過程中，發現 `ReactHookForm` 在操作資料時都是以 `string` 的方式儲存，要解決這個問題需要再加上 `setValueAs`，範例程式使用的 parseInt(v,10)，可以是任意轉為數字的函式，簡單來說就是需要把字串轉乘數字使用，直接使用 `Number(v)` 也是可以的

    ```tsx
      <input className={style.input} {...register('userName', {
                        setValueAs: v => v === "" ? undefined : parseInt(v, 10) 
                    })} placeholder='UserName' />
    ```

    但這樣的作法其實比較麻煩，還需要特地到 `tsx` 內調整，因此 `Zod` 還有提供了 `coerce` 的方法，[相關說明請點我](https://zod.dev/?id=coercion-for-primitives)

    它最主要的功能其實就是先轉型，因始就不需要在特地到 `tsx` 內轉型

    ```ts
    // 舊程式碼
     const registerSchema = z.object({
        userName: z.string().min(1),
    });

    // 新程式碼，不需要做太大的異動
    const registerSchema = z.object({
            userName: z.coerce.number().min(1),
        });

    ```
- 如何做密碼驗證

    密碼驗證是表單非常常見的功能，`Zod` 提供了 [`.refine`](https://zod.dev/?id=refine)，但直覺性的部分，感覺還是可以記錄一下

    範例程式中，'refine' 的 'callback' 撰寫的是 `password === confirmPassword`，初次理解上會有點詭異

    所以換個方式理解，**`自訂的規則是 password 必須等於 confirm，否則要顯示錯誤訊息`**，這樣比較好理解

    ``` tsx
    const registerSchema = z.object({
    userName: z.coerce.string().min(1).regex(/^[a-zA-Z0-9_]+$/, '只能包含字母、數字和底線'),
    email: z.string().email('無效的 email 格式'),
    password: z.string().min(6, '密碼至少 6 位'),
    confirmPassword: z.string().min(6, '密碼至少 6 位'),
    }).refine((data) => data.password === data.confirmPassword, {
        message: '密碼不一致',
        path: ['confirmPassword'],
    })
    ```

- 如何透過 Vite 使用環境變數

    建立 `.env`，然後必須要以 `VITE` 為開頭的名稱，譬如 `VITE_API_URL`，透過 `import.meta.env.VITE_API_URL` 即可取得內容

### MongoDB

第一次使用 NoSQL 作為資料庫，學習過程是挺有趣了，比起以往使用 MSSQL 建立 DB 的時候要寫一堆 SQL Command 來的有趣

搜尋資料也完全透過 JavaScript 就可以搞定了

因為目前僅專注在前端開發，只是需要一個地方可以存資料，所以並沒有深入研究

僅記錄安裝的三個建議軟體，[點我看哪三個](https://wei-docusaurus-vercel.vercel.app/docs/MongoDB/mongoose-1#mongodb-%E5%89%8D%E7%BD%AE%E4%BD%9C%E6%A5%AD%E6%9C%AC%E5%9C%B0%E7%AB%AF)


參考的學習資源為 [[mongodb] MongoDB — Mongoose 介紹與使用教學 (上)](https://wei-docusaurus-vercel.vercel.app/docs/MongoDB/mongoose-1)、[[mongodb] MongoDB — Mongoose 介紹與使用教學 (下)](https://wei-docusaurus-vercel.vercel.app/docs/MongoDB/mongoose-2)
