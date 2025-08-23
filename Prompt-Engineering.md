
-----

# Creación de *Prompts* Efectivos para IA

Un **prompt** es un conjunto de instrucciones o texto que se le proporciona a un modelo de lenguaje para obtener una respuesta.

  * **Ejemplo de prompt simple:** "Escribe una carta de agradecimiento".
  * **Ejemplo de prompt detallado:** "Escribe una carta de agradecimiento a un amigo que me ayudó a estudiar para un examen difícil. Usa un tono amistoso y menciona su apoyo emocional".

### Importancia de un buen prompt

Un buen *prompt* es fundamental porque define el contexto y la calidad de la respuesta, evita malentendidos y respuestas irrelevantes, y optimiza la interacción con la IA para obtener resultados específicos.

-----

## Elementos Clave de un Buen *Prompt*

1.  **Claridad:** Ser específico y directo en lo que se pide.
2.  **Contexto:** Proveer información relevante sobre el tema.
3.  **Propósito:** Explicar qué se espera como resultado final.
4.  **Estructura:** Usar frases bien organizadas para que la IA entienda mejor la solicitud.

**Ejemplos de claridad:**

  * **Vago:** "Dime algo sobre marketing".
  * **Claro:** "Explica en 200 palabras cómo las redes sociales pueden ayudar a las pequeñas empresas a aumentar sus ventas".

**Ejemplos de contexto:**

  * **Sin contexto:** "¿Qué es un árbol?".
  * **Con contexto:** "¿Qué es un árbol en el contexto de la programación de estructuras de datos?".

-----

## El Contexto en un *Prompt*

El **contexto** en un *prompt* es la información relevante que permite a la IA comprender la situación, el propósito y los detalles necesarios para generar una respuesta adecuada y precisa. Es un elemento crucial que le da a la IA el marco de referencia que necesita para enfocar su respuesta, reduciendo ambigüedades y la probabilidad de obtener resultados irrelevantes.

Dar contexto a la IA es como darle a un chef instrucciones detalladas sobre los ingredientes, el tipo de plato que se necesita y la ocasión para la cual se prepara, en lugar de simplemente pedirle "cocina algo".

#### Elementos Clave del Contexto:

1.  **Situación:** El escenario o el problema que la IA debe considerar.
2.  **Objetivo:** Lo que se espera lograr con la respuesta.
3.  **Audiencia:** Quién recibirá o utilizará la información (ej. expertos, estudiantes, público general). Esto influye en el tono y el nivel de detalle.
4.  **Formato:** Cómo debe estructurarse la respuesta (ej. un ensayo, una lista, una tabla, un resumen).

#### Ejemplos para ilustrar el impacto del contexto:

  * **Prompt sin contexto:** "Escribe un informe."
  * **Prompt con contexto:** "Eres un **analista financiero** y tu objetivo es escribir un **informe de 300 palabras** sobre el impacto de la inflación en las **pequeñas empresas** durante el último año. El informe debe estar dirigido a **propietarios de negocios**."

En el segundo ejemplo, la IA recibe información vital que guía su respuesta: su **rol** (analista financiero), el **propósito** (escribir un informe), la **extensión** (300 palabras), el **tema** (inflación y pequeñas empresas), la **audiencia** (propietarios de negocios) y el **formato** (informe).

#### **Uso de Delimitadores para Claridad**

Para evitar ambigüedades, especialmente en prompts largos, se recomienda usar delimitadores como comillas triples (`"""`), guiones o etiquetas (`<instrucción>`) para separar las instrucciones del texto que la IA debe procesar.

**Ejemplo:**

```
Eres un experto en ciberseguridad.
Resume las vulnerabilidades del siguiente código y propón una solución.
El resumen debe ser en formato de lista.

"""
def validate_user(user):
    if user.is_admin:
        return True
    return False
"""
```

-----

## Asignación de Rol a la IA

Asignar un rol contextualiza a la IA en un área específica de conocimiento, permitiendo respuestas más relevantes, precisas y ajustadas al contexto.

  * **Ejemplo:** "Eres un médico especializado en pediatría. ¿Cómo tratarías la fiebre en un niño?" vs. la pregunta genérica "¿Cómo tratar la fiebre?".

-----

## Especificar la Tarea

Incluir una instrucción clara sobre la acción que la IA debe realizar es crucial para evitar respuestas genéricas y reducir la necesidad de iteraciones adicionales.

  * **Tarea vaga:** "Explícame algo sobre historia".
  * **Tarea clara:** "Resume en 150 palabras las principales causas de la Revolución Francesa".

**Componentes básicos de la tarea:**

1.  **Acción principal:** Qué debe hacer la IA (explicar, resumir, redactar, analizar, etc.).
2.  **Formato esperado:** Cómo debe presentarse la respuesta (ensayo, lista, tabla, resumen, etc.).
3.  **Extensión o nivel de detalle:** Cuán extensa o específica debe ser la respuesta.

-----

## El Cierre en un *Prompt*

El cierre es la parte final del *prompt* donde se especifica claramente el formato de salida y se resumen los puntos clave que la IA debe tener en cuenta.

  * **Sin cierre:** "Explica la teoría de la evolución".
  * **Con cierre:** "Explica la teoría de la evolución en un texto de 200 palabras, dirigido a estudiantes de secundaria, y termina con un ejemplo práctico".

**Importancia del cierre:**

  * **Precisión:** Define con exactitud el resultado esperado.
  * **Consistencia:** Refuerza el contexto y los roles para mantener la coherencia.
  * **Calidad:** Mejora la claridad y la calidad del resultado final.

-----

## Técnicas Comunes de Ingeniería de *Prompts*

### 1\. El *Prompt* de los 7 Elementos

Esta técnica utiliza siete elementos clave para estructurar y optimizar los *prompts*:

  * **Persona o rol:** Asigna un rol a la IA (ej. "Eres un analista financiero").
  * **Tarea:** Define la acción principal (ej. "Escribe un informe").
  * **Longitud:** Especifica la extensión (ej. "en 300 palabras").
  * **Formato:** Indica el formato de salida (ej. "en una tabla").
  * **Estructura:** Organiza la respuesta (ej. "con una introducción y tres puntos clave").
  * **Tono:** Define el estilo (ej. "con un tono profesional").
  * **Ejemplos:** Proporciona ejemplos para guiar a la IA (ver las siguientes técnicas).

### 2\. Marco C.L.A.R.O.

Este acrónimo organiza las mejores prácticas para diseñar *prompts* de manera efectiva:

  * **C**laridad en el mensaje.
  * **L**enguaje adaptado al público objetivo.
  * **A**juste al formato de salida esperado.
  * **R**efinamiento iterativo del *prompt*.
  * **O**rganización y documentación de los *prompts*.

### 3\. Aproximación sin Ejemplos (*Zero-shot*)

Esta técnica le pide a un modelo de lenguaje que realice una tarea **sin proporcionarle ejemplos previos**.

  * **Ejemplo:** "¿Cuál es la capital de Alemania?".
  * **Otro ejemplo:** "Traduce la siguiente frase al francés: 'Hola, ¿cómo estás?'".

### 4\. Aproximación con un Solo Ejemplo (*One-shot*)

Se basa en proporcionar al modelo **un solo ejemplo claro** de entrada y salida para que entienda el formato deseado.

  * **Ejemplo:** "Convierte la siguiente lista en una lista de tareas completadas:
    Entrada:
      - Comprar leche
      - Ir al gimnasio
      - Llamar al médico
        Salida:
      - ✅ Comprar leche
      - ✅ Ir al gimnasio
      - ✅ Llamar al médico
        Ahora convierte la siguiente lista de la misma manera:
        Entrada:
      - Pagar la renta
      - Escribir informe
      - Enviar correo"

### 5\. Aproximación con Varios Ejemplos (*Few-shot*)

Implica proporcionar al modelo **múltiples ejemplos** de entrada y salida para que aprenda a realizar una tarea específica, identificando patrones más complejos.

  * **Ejemplo:**
    "Entrada: El perro se llama Max.
    Salida: El perro es masculino.
    Entrada: La gata se llama Luna.
    Salida: La gata es femenina.
    Entrada: La jirafa se llama Sophie.
    Salida: La jirafa es femenina.
    Ahora, haz lo mismo para el siguiente texto: El elefante se llama Jumbo."

-----

### **6. Encadenamiento de Pensamiento (*Chain of Thought*)**

Esta técnica es útil para problemas complejos que requieren múltiples pasos de razonamiento. En lugar de pedir la respuesta final directamente, se le pide a la IA que muestre su proceso de pensamiento paso a paso.

**Ejemplo:**

  * **Sin *Chain of Thought*:** "Si una tienda vende 5000 productos y cada producto cuesta $10, y el costo de producción por producto es de $5, ¿cuál es la ganancia total?"
  * **Con *Chain of Thought*:** "Si una tienda vende 5000 productos y cada producto cuesta $10, y el costo de producción por producto es de $5, ¿cuál es la ganancia total? Por favor, muestra cada paso del cálculo para llegar a la respuesta."

-----

### **Cómo Combinar Técnicas para Prompts Más Efectivos**

Para optimizar el 80% de tus resultados, combina las técnicas más poderosas. El verdadero potencial de la ingeniería de *prompts* se revela al usarlas en conjunto.

**Ejemplo de combinación:**

  * **Prompt Vago:** "Analiza las ventas."

  * **Prompt Combinado y Refinado:**
    `Eres un **analista de datos** especializado en marketing. Tu tarea es analizar los datos de ventas del último trimestre. Muestra el cálculo de la ganancia total, el producto más vendido y la ganancia por producto.`

    `Para llegar a la respuesta, **muestra tu proceso de pensamiento paso a paso (Chain of Thought)** y presenta los resultados en un **formato de tabla** al final. El tono debe ser **profesional y conciso**.`

Este ejemplo usa un **rol**, **tarea**, **encadenamiento de pensamiento**, **formato**, y **tono** para guiar a la IA hacia una respuesta precisa y bien estructurada.

-----

### En resumen, la ingeniería de prompts implica:

* **Diseñar instrucciones claras y concisas**: Evitar la ambigüedad y ser específico.
* **Proporcionar contexto relevante**: Incluir ejemplos, formatos deseados y detalles necesarios.
* **Experimentar con diferentes prompts**: Iterar y ajustar las instrucciones para optimizar los resultados.
* **Adaptar los prompts a cada modelo**: Considerar las particularidades de cada modelo de lenguaje.
* **Aprender de la práctica**: Analizar las respuestas del modelo para mejorar la efectividad de los prompts.