# Mobix - Documentación en Español

Consultar la vigilancia del estado del teléfono, la gestión de SMS y la gestión de llamadas a través de una interfaz web.

## Índice

- [Funcionalidades](#funcionalidades)
- [Requisitos](#requisitos)
- [Instalar Termux:API](#instalar-termuxapi)
- [Instalación](#instalación)
- [Inicio Rápido](#inicio-rápido)
- [Comandos](#comandos)
- [Configuración](#configuración)
- [Servicio en Segundo Plano](#servicio-en-segundo-plano)
- [Internacionalización](#internacionalización)
- [TODO List](#todo-list)
- [Desarrollo y Contribución](#desarrollo-y-contribución)
- [Licencia](#licencia)

## Funcionalidades

### Estado del Teléfono

- **Estado de red**: SSID, dirección IP, intensidad de señal, velocidad de conexión
- **Estado de tarjeta SIM**: Nombre del operador, estado de la tarjeta SIM
- **Estado de batería**: Porcentaje de batería, temperatura, estado de carga, tipo de fuente de alimentación

### Gestión de SMS

- **Bandeja de entrada/enviados**: Conmutación por campo type, paginación independiente, contadores por categoría
- **Enviar SMS**: Entrada manual del número o selección desde contactos
- **Respuesta rápida**: Entrada « Responder » en elementos de lista, salto con un clic al formulario de envío con número pre-llenado
- **Paginación**: Navegar historial de SMS con paginación

### Registro de Llamadas

- **Etiquetas de clasificación**: Entrantes, Salientes, Perdidas
- **Números desconocidos**: Mostrar el número de teléfono directamente (no texto de marcador de posición)
- **Orden**: Orden cronológico inverso

### Protección por Contraseña

- Establecer contraseña de acceso vía comando `mobix pwd`
- Contraseña cifrada con AES-256-GCM en archivo de configuración
- Sin contraseña si no establecida
- Reinicio necesario después de establecer/eliminar contraseña

## Requisitos

Este proyecto debe ejecutarse en un dispositivo Android y depende de Termux, Termux:API y Node.js.

### Aplicaciones a instalar

Se recomienda instalar las siguientes aplicaciones vía F-Droid:

- [Termux](https://f-droid.org/en/packages/com.termux/)
- [Termux:API](https://f-droid.org/en/packages/com.termux.api/)

Termux y Termux:API deben instalarse desde el mismo canal para evitar problemas de plugin causados por inconsistencia de firma o versión.

### Permisos de Android

El proyecto llama a funciones del sistema Android vía Termux:API. Al usar por primera vez las funciones correspondientes, debe conceder los permisos correspondientes a Termux:API en la configuración del sistema.

Normalmente se encuentra en:

```
Configuración → Aplicaciones → Termux:API → Permisos
```

Los nombres de menú pueden variar según la versión de Android y el fabricante del teléfono.

Relación entre comandos y permisos:

| Comando | Función | Permiso requerido |
| --- | ---| --- |
| termux-battery-status | Obtener estado de batería | Normalmente sin permiso adicional |
| termux-wifi-connectioninfo | Obtener info de conexión Wi-Fi | Permiso de red; algunos sistemas también requieren ubicación |
| termux-telephony-deviceinfo | Obtener info de dispositivo y tarjeta SIM | Permiso de teléfono o info de dispositivo |
| termux-sms-list | Leer SMS | Permiso de lectura de SMS |
| termux-sms-send | Enviar SMS | Permiso de envío de SMS |
| termux-contact-list | Leer contactos | Permiso de contactos |
| termux-call-log | Leer registro de llamadas | Permiso de registro de llamadas |

Si no utiliza una función, no necesita el permiso correspondiente.

### Confirmación de envío de SMS en Android

Algunas versiones de Android o sistemas de teléfono pueden requerir confirmación manual al enviar un SMS por primera vez, o mostrar prompts de autorización para SMS, SMS premium, etc.

Si el envío de SMS falla, verifique lo siguiente:

Confirme que se ha concedido el permiso de SMS a Termux:API;
Ejecute manualmente un comando de SMS de prueba:

```bash
termux-sms-send -n "10086" ""
```

- Si el sistema muestra una ventana de confirmación, permita manualmente;
- Si el sistema pide permitir «SMS premium», confirme según sea necesario;
- Verifique si el sistema restringe la ejecución en segundo plano de Termux o Termux:API;

Algunos dispositivos pueden requerir que una aplicación se establezca como aplicación de SMS predeterminada.

<b>El envío de SMS puede incurir en cargos del operador. Se recomienda probar primero con su propio número de teléfono.</b>

### Consejos

Para evitar que el sistema Android restrinja la ejecución en segundo plano o recupere el proceso Termux, causando interrupción del servicio, se recomienda en la configuración del sistema:

- Añadir Termux a la lista blanca de ejecución en segundo plano;
- Desactivar la optimización de batería o las restricciones de ahorro de energía para Termux;
- Permitir que Termux se ejecute en segundo plano.

Los nombres de configuración pueden variar según la marca. Normalmente se encuentra en:

```text
Configuración → Aplicaciones → Termux → Batería
```

Elija según el sistema del dispositivo «Permitir ejecución en segundo plano», «Sin restricciones» o una opción similar.

## Instalar Termux:API

Abrir Termux y ejecutar los siguientes comandos:

```bash
pkg update
pkg upgrade -y
pkg install termux-api -y
```

## Instalación

### Instalar Node.js

- (Recomendado) Instalar Node.js LTS
   ```
   pkg install nodejs-lts -y
   ```
- Instalar versión actual
  ```
  pkg install nodejs -y
  ```

Después de la instalación, ejecute los siguientes comandos para verificar:

```bash
# Verificar versión de Node.js
node -v

# Verificar versión de npm
npm -v
```

### Opción 1: instalación global npm (recomendado)

```bash
npm install -g @hreign/mobix
```

El comando `mobix` estará disponible globalmente.

### Opción 2: distribución zip

Si tiene conocimientos y experiencia con Node.js,
descargue `mobix-app.zip` desde [Release](https://github.com/hreign/mobix-android/releases), extraiga y ejecute:

```bash
node app/dist/server.js
```

## Inicio Rápido

```bash
# Iniciar servicio (puerto por defecto 7788, segundo plano)
mobix start

# Verificar estado del servicio
mobix status

# Acceso desde navegador
# http://<ip-dispositivo>:7788

# Detener servicio
mobix stop
```

## Comandos

### mobix start

Iniciar servicio Mobix en segundo plano, sobrevive al cierre del terminal.

```bash
mobix start                # Puerto por defecto 7788
mobix start --port 8080    # Puerto específico
```

### mobix stop

Detener el servicio en ejecución.

```bash
mobix stop
```

### mobix status

Mostrar estado del servicio, PID y puerto.

```bash
mobix status
```

### mobix restart

Reiniciar servicio con la última configuración.

```bash
mobix restart
```

### mobix pwd

Establecer o ver la contraseña de acceso. Cifrada con AES-256-GCM.

```bash
mobix pwd                  # Ver estado de contraseña
mobix pwd mypassword       # Establecer contraseña
mobix pwd ""               # Eliminar contraseña
```

Reinicio necesario después de establecer:

```bash
mobix pwd mypassword
mobix restart
```

### mobix port

Establecer o ver el puerto de escucha.

```bash
mobix port                 # Ver puerto actual
mobix port 9000            # Cambiar puerto
```

Reinicio necesario después de cambiar:

```bash
mobix port 9000
mobix restart
```

### mobix help

Mostrar ayuda.

```bash
mobix help                 # Ayuda general
mobix help start           # Ayuda detallada de start
```

## Configuración

Archivo de config: `~/.mobix/config.json`, permiso 0600.

```json
{
  "version": 1,
  "port": 7788,
  "password": {
    "algorithm": "aes-256-gcm",
    "iv": "...",
    "data": "..."
  }
}
```

| Opción | Descripción | Defecto |
|--------|------|--------|
| port | Puerto de escucha | 7788 |
| password | Contraseña de acceso (cifrada) | Ninguna (sin contraseña) |

Prioridad de puerto: archivo config > env `PORT` > defecto 7788

Prioridad de contraseña: archivo config > env `MOBIX_PASSWORD` > ninguna

## Servicio en Segundo Plano

- `mobix start` lanza un demonio en segundo plano, sobrevive al cierre del terminal
- Independiente de systemd / init / launchd
- En Android Termux: `termux-wake-lock` para evitar suspensión del dispositivo
- Archivo PID: `~/.mobix/mobix.pid`, usado por stop / status / restart

## Internacionalización

La app soporta 8 idiomas: Chino, Inglés, Japonés, Coreano, Francés, Alemán, Español, Ruso.

Conmutación automática según el idioma del sistema, sin configuración adicional.

Si la detección falla o se encuentra un idioma no soportado, retrocede al inglés.

## TODO List

- [ ] Mejorar la experiencia de envío de SMS
- [ ] Añadir más funciones de vigilancia del estado del teléfono
- [ ] Mejorar el diseño de la interfaz
- [ ] Añadir más soporte de internacionalización
- [ ] Función de llamada remota
- [ ] Función de push de mensajes (alerta de batería, notificación de SMS, notificación de llamada)
  - Evaluar el impacto de diferentes enfoques de vigilancia en la autonomía del dispositivo
  - Priorizar implementación de bajo consumo, reducir sondeos innecesarios
  - Soportar condiciones de alerta personalizadas, frecuencia de notificación y filtrado de mensajes duplicados


## Desarrollo y Contribución

Contribuciones en cualquier forma son bienvenidas, incluyendo pero no limitado a:

- Enviar issues para reportar problemas o sugerencias
- Enviar pull requests para compartir código
- Compartir experiencias de uso o escribir documentación


## Licencia

MIT
