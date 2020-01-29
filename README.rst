==========
deploy-app
==========

This webapp is a frontend for the deploy-webhook_ API. It allows for management
of Docker services and its containers.

.. _deploy-webhook: https://github.com/TheEdgeOfRage/deploy-webhook

Installation
============

Docker
------

Adjust the port in the `docker-compose.yml` file if necessary and run:

.. sourcecode:: bash

    docker-compose up -d

Host
----

Install the dependencies and run a production build with:

.. sourcecode:: bash

    yarn install
    yarn build

Copy the contents of the `dist` folder to the webserver root. Everything is
completely static, so no other server is needed.

Usage
=====

When opening the app for the first time, a login screen is shown. The URL field
must contain the link to the backend API. As for the username and password,
please refer to the `deploy-webhook setup guide
<https://docs.theedgeofrage.com/deploy-webhook/setup.html>`_.

Once logged in, you can add services using the plus button on the bottom of the
service list. Clicking on any service in the list will expand a list of all
containers that belong to that service with options to retrieve their logs and
execute commands in them. The color of the container name text indicates its
status. Green is running, yellow is starting and red is stopped.

Currently the list of containers is limited only to the containers that are
running on the same node as the deploy-webhook backend, but there are plans
to manage all containers in the stack in the future.

The yellow reload button at the bottom triggers a stack update, pulling the
newest images from the registry and atomically updating all services.

Screenshots
===========

.. image:: https://pyazo.theedgeofrage.com/KHLJO4Dx9gHgxcV3q0UU6ya9fwyUGOQb.png

.. image:: https://pyazo.theedgeofrage.com/bIzPtkd8Piodko7BwI3lQx07vTdddKcA.png

.. image:: https://pyazo.theedgeofrage.com/nKKvA1sL4HjWBis5gxxepJNwIBHROg2V.png

Development setup
=================

.. sourcecode:: bash

    yarn install

Compiles and hot-reloads for development
----------------------------------------

.. sourcecode:: bash

    yarn run serve

Lints and fixes files
---------------------

.. sourcecode:: bash

    yarn run lint
License
=======

This software is distributed under terms of the BSD-3-Clause license.


Credits
=======

Favicon: https://icons8.com/icons/set/rocket
