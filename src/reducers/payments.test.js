import {
  PAYMENTS_STARTS_PROCESSING,
  PAYMENTS_ERROR,
  PAYMENTS_LOAD,
  PAYMENTS_MARK_AS_SEEN
} from '../actions/payments';
import { publicKey } from '../__tests__/fixtures/keypair';
import reducer from './payments';
import { selectFirstUnseenPayment } from './payments';

const defaultState = {
  isProcessing: false,
  error: null,
  payments: [],
  firstPageLoaded: false,
  hasNextPage: false,
  data: null,
  lastPagingToken: null,
  unseenPaymentIds: []
};

const buildState = attrs => Object.assign({}, defaultState, attrs);

describe('selectFirstUnseenPayment', () => {
  it('returns null if no unseen payment ids exist', () => {
    const result = selectFirstUnseenPayment(defaultState);
    expect(result).toEqual(null);
  });

  it('returns the first payment if they are listed as unseen payment ids', () => {
    const state = Object.assign({}, defaultState, {
      unseenPaymentIds: '1',
      payments: [
        { id: '1', amount: '10.0000000' },
        { id: '2', amount: '20.0000000' }
      ]
    });
    const result = selectFirstUnseenPayment(state);
    expect(result).toEqual({ id: '1', amount: '10.0000000' });
  });
});

describe('reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('handles PAYMENTS_STARTS_PROCESSING', () => {
    expect(
      reducer(undefined, {
        type: PAYMENTS_STARTS_PROCESSING,
        isProcessing: true
      })
    ).toEqual(buildState({ isProcessing: true }));
  });

  it('handles PAYMENTS_ERROR', () => {
    expect(
      reducer(undefined, {
        type: PAYMENTS_ERROR,
        error: 'error message',
        isProcessing: false
      })
    ).toEqual(
      buildState({
        isProcessing: false,
        error: 'error message'
      })
    );
  });

  it('handles PAYMENTS_MARK_AS_SEEN', () => {
    expect(
      reducer(
        buildState({
          unseenPaymentIds: ['PAYMENT_ID_ONE', 'PAYMENT_ID_TWO']
        }),
        {
          type: PAYMENTS_MARK_AS_SEEN,
          paymentId: 'PAYMENT_ID_ONE'
        }
      )
    ).toEqual(
      buildState({
        unseenPaymentIds: ['PAYMENT_ID_TWO']
      })
    );
  });

  describe('PAYMENTS_LOAD', () => {
    it('handles the first PAYMENTS_LOAD and sets the lastPagingToken according to it', () => {
      expect(
        reducer(undefined, {
          type: PAYMENTS_LOAD,
          payments: [{ id: 'PAYMENT_ID', paging_token: '123' }],
          data: 'DATA',
          firstPageLoaded: true,
          hasNextPage: true,
          error: null,
          isProcessing: false,
          publicKey
        })
      ).toEqual(
        buildState({
          isProcessing: false,
          error: null,
          payments: [{ id: 'PAYMENT_ID', paging_token: '123' }],
          data: 'DATA',
          firstPageLoaded: true,
          hasNextPage: true,
          lastPagingToken: '123',
          unseenPaymentIds: []
        })
      );
    });

    it('replaces the with existing payments and paging_token in the state', () => {
      expect(
        reducer(
          buildState({
            payments: [
              { id: 'OLD_PAYMENT_ID', paging_token: '122', to: publicKey }
            ],
            lastPagingToken: '122',
            firstPageLoaded: true,
            unseenPaymentIds: []
          }),
          {
            type: PAYMENTS_LOAD,
            payments: [
              { id: 'NEW_PAYMENT_ID', paging_token: '123', to: publicKey }
            ],
            data: 'DATA',
            hasNextPage: true,
            error: null,
            isProcessing: false,
            publicKey
          }
        )
      ).toEqual({
        isProcessing: false,
        error: null,
        payments: [
          { id: 'NEW_PAYMENT_ID', paging_token: '123', to: publicKey }
        ],
        data: 'DATA',
        hasNextPage: true,
        lastPagingToken: '123',
        unseenPaymentIds: ['NEW_PAYMENT_ID']
      });
    });

    it('does not add new payments to unseed, if user is not credited', () => {
      expect(
        reducer(
          buildState({
            payments: [],
            lastPagingToken: '122',
            firstPageLoaded: true,
            unseenPaymentIds: []
          }),
          {
            type: PAYMENTS_LOAD,
            payments: [
              {
                id: 'NEW_PAYMENT_ID',
                paging_token: '123',
                to: 'SOME_OTHER_PUBLIC_KEY'
              }
            ],
            data: 'DATA',
            hasNextPage: true,
            error: null,
            isProcessing: false,
            publicKey
          }
        )
      ).toEqual({
        isProcessing: false,
        error: null,
        payments: [
          {
            id: 'NEW_PAYMENT_ID',
            paging_token: '123',
            to: 'SOME_OTHER_PUBLIC_KEY'
          }
        ],
        data: 'DATA',
        hasNextPage: true,
        lastPagingToken: '123',
        unseenPaymentIds: []
      });
    });

    it('appends new unseen payment ids to existing unseed payment ids', () => {
      expect(
        reducer(
          buildState({
            payments: [{ id: 'OLD_PAYMENT_ID', paging_token: '122' }],
            lastPagingToken: '122',
            firstPageLoaded: true,
            unseenPaymentIds: ['OLD_PAYMENT_ID']
          }),
          {
            type: PAYMENTS_LOAD,
            payments: [{ id: 'NEW_PAYMENT_ID', paging_token: '123' }],
            data: 'DATA',
            hasNextPage: true,
            error: null,
            isProcessing: false
          }
        )
      ).toEqual({
        isProcessing: false,
        error: null,
        payments: [{ id: 'NEW_PAYMENT_ID', paging_token: '123' }],
        data: 'DATA',
        hasNextPage: true,
        lastPagingToken: '123',
        unseenPaymentIds: ['OLD_PAYMENT_ID', 'NEW_PAYMENT_ID']
      });
    });
  });
});
