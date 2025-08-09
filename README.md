
# App RealTimeChat

Aplicativo utilizado para gerenciar o fluxo de atendimento de pacientes em diferentes localidades e etapas dentro da RealTimeChat. 


## 1. Localidade

A tela de localidade possibilitará o usuário selecionar qual localidade o aplicativo irá atender.

**As localidades disponíveis são:**

- *Pronto Atendimento Adulto*
- *P.A Adulto Observação Masculino*
- *P.A Adulto Observação Feminino*
- *Pronto Atendimento Pediátrico*
- *P.A Pediátrico Observação Masculino*
- *P.A Pediátrico Observação Feminino*
- *P.A Pediátrico Observação Indefinido*

Cada localidade possui seu respectivo código. Após selecioná-la, a mesma será salva em localStorage com o nome *Localidade* para persistir a sessão.


## 2. Log-in 

Após selecionar a localidade, o usuário deve realizar o login utilizando reconhecimento facial. 

**O processo de login envolve:**

- Informar o crachá para que o back-end verifique se o usuário possui permissão.
- O usuário deve ter uma foto cadastrada no S3. Caso não tenha, ele deve acessar a tela de cadastro de face no endereço: https://apps.ham.org.br/appregistrofoto.

Após um login bem-sucedido, a sessão do usuário é salva no localStorage com o nome **user**, e ele é redirecionado para a tela de *Receber*.

## 3. Tela de Recebimento
Na tela de recebimento, é exibida uma listagem de pacientes com base na localidade selecionada e na etapa de recebimento (código 1). A consulta para listar os pacientes usa o código da localidade e o código da etapa.

**Funcionalidades:**

- **Avançar Etapa**: Clicar no card de um paciente inicia um spinner que contabiliza 2 segundos antes de avançar o paciente para a próxima etapa. O usuário pode cancelar o avanço clicando novamente no card.
- **Filtragem**: O usuário pode filtrar a lista de pacientes utilizando o campo de pesquisa no cabeçalho, filtrando por Nome do Paciente ou Data de Nascimento.

## 4. Tela de Atender

Na tela de atendimento, são listados pacientes que estão aguardando atendimento e os que já estão em atendimento:

- **Pacientes aguardando atendimento**: código de etapa 2.
- **Pacientes em atendimento**: código de etapa 3, com uma bandeira indicando que o paciente está em atendimento.
Ao clicar no card de um paciente que está aguardando atendimento, o paciente é automaticamente avançado para a etapa "Em atendimento/Etapa 3", e o usuário é redirecionado para a tela do OpenCard.


## 5. OpenCard / Em Atendimento
A tela do OpenCard exibe informações detalhadas sobre o paciente e os medicamentos que ele precisa tomar.

**Funcionalidades:**
- **Checagem de Medicamentos**: Permite marcar medicamentos como checados ou recusados.
- Observações de Alergia: Visualizar observações de alergia do paciente.
- **Hipótese Diagnóstica**: Visualizar a hipótese diagnóstica do paciente.
- **Finalizar Atendimento**: Permite finalizar o atendimento assim que todas as medicações forem checadas.
- **Evasão do Paciente**: Caso o paciente evada, o usuário pode abrir um modal para confirmar a evasão, o que chama uma procedure de evasão e avança o paciente para a etapa de Atendidos.
- **Observação**: Se o OpenCard for fechado acidentalmente após a checagem de uma medicação, o usuário pode reabri-lo acessando a tela "Atender" e visualizando os pacientes na seção "Em Atendimento" ou filtrando pelo nome do paciente.

## 6. Atendidos do Dia
Esta tela possui o código de etapa 4 e exibe todos os pacientes que já foram atendidos ou que evadiram.

**Funcionalidade:**
- **Retornar Paciente**: Para retornar o card de um paciente à tela de atendimento, basta realizar um long press no card e clicar em *"Desfazer Etapa"*, o que fará o paciente retornar à etapa anterior.



## COMEÇANDO A INCLUIR JWT TOKEN 





## Instalação do Aplicativo

Para realizar a instalação do aplicativo em um smarthphone, basta acessar o endereço **/Install** e clicar em Instalar.


## Template utilizado para desenvolver a aplicação


 - [Template NexJs HAM](https://github.com/Hospital-Adventista-de-Manaus/framework-nextjs-model)

## Repositório do ambiente back-end do aplicativo

 - [Back-end](https://github.com/Hospital-Adventista-de-Manaus/api_sala_medicacao)
