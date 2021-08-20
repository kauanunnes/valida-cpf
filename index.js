class ValidaCPF {
  constructor(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
      writable: false,
      enumerable: false,
      configurable: false,
      value: cpfEnviado.replace(/\D+/g, '')
    })
  }

  ehSequencia() {
    return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo
  }

  geraNovoCpf() {
    const cpfParcial = this.cpfLimpo.slice(0, -2)
    const digito1 = ValidaCPF.geraDigito(cpfParcial)
    const digito2 = ValidaCPF.geraDigito(cpfParcial + digito1)
    this.novoCPF = cpfParcial + digito1 + digito2
  }

  static geraDigito(cpfParcial) {
    let total = 0
    let reverso = cpfParcial.length + 1
    for (let stringNumerica of cpfParcial) {
      total += reverso * Number(stringNumerica)
      reverso--
    }

    const digito = 11 - (total % 11)
    return digito <= 9 ? String(digito) : 0
  }

  valida() {
    if (!this.cpfLimpo) return false
    if (typeof this.cpfLimpo !== 'string') return false
    if (this.cpfLimpo.length !== 11) return false
    if (this.ehSequencia()) return false
    this.geraNovoCpf()
    return this.novoCPF === this.cpfLimpo
  }
}

document.querySelector('main .container form button').addEventListener('click', () => {
  let field = document.querySelector('#cpf')
  let fieldValue = document.querySelector('#cpf').value
  const modal = document.querySelector('.modal')
  const falseModal = document.querySelector('.false')
  modal.setAttribute('id', 'show')
  if (!fieldValue) {
    falseModal.innerHTML = 'Campo CPF vazio.'
    falseModal.setAttribute('class', 'false active')

    setTimeout(() => {
      field.value = ''
      modal.setAttribute('id', '')
      modal.querySelector('.false').setAttribute('class', 'false')

    }, 2000)
    return
  }
  const cpf = new ValidaCPF(String(fieldValue))
  if (cpf.valida()) {
    console.log(modal)
    document.querySelector('.true').setAttribute('class', 'true active')
    setTimeout(() => {
      field.value = ''
      modal.setAttribute('id', '')
      modal.querySelector('.true').setAttribute('class', 'true')

    }, 2000)
  } else {
    console.log(falseModal)
    falseModal.innerHTML = 'CPF inválido.'
    falseModal.setAttribute('class', 'false active')
    setTimeout(() => {
      field.value = ''
      modal.setAttribute('id', '')
      modal.querySelector('.false').setAttribute('class', 'false')

    }, 2000)
  }
})

document.querySelector('main .container form').addEventListener('submit', (e) => {
  e.preventDefault()
})